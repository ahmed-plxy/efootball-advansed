import { and, asc, desc, eq, gte, ilike, isNotNull, isNull, lte, ne } from "drizzle-orm";
import { Router, type IRouter } from "express";
import { db, categoriesTable, offersTable, productsTable } from "@workspace/db";
import {
  GetProductParams,
  GetProductResponse,
  ListCategoriesResponse,
  ListOffersQueryParams,
  ListOffersResponse,
  ListProductsQueryParams,
  ListProductsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function singleQueryValue(value: unknown): unknown {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeCatalogQuery(query: Record<string, unknown>): Record<string, unknown> {
  const featured = singleQueryValue(query.featured);
  const offers = singleQueryValue(query.offers);

  return {
    ...query,
    featured: typeof featured === "string" ? featured === "true" : featured,
    offers: typeof offers === "string" ? offers === "true" : offers,
  };
}

router.get("/products", async (req, res): Promise<void> => {
  const parsed = ListProductsQueryParams.safeParse(
    normalizeCatalogQuery(req.query as Record<string, unknown>),
  );
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const query = parsed.data;
  const conditions = [
    query.status ? eq(productsTable.status, query.status) : ne(productsTable.status, "Hidden"),
    query.search
      ? ilike(productsTable.title, `%${query.search}%`)
      : undefined,
    query.category ? eq(productsTable.category, query.category) : undefined,
    query.platform ? eq(productsTable.platform, query.platform) : undefined,
    query.minCoins !== undefined ? gte(productsTable.coins, query.minCoins) : undefined,
    query.maxCoins !== undefined ? lte(productsTable.coins, query.maxCoins) : undefined,
    query.minGp !== undefined ? gte(productsTable.gp, query.minGp) : undefined,
    query.maxGp !== undefined ? lte(productsTable.gp, query.maxGp) : undefined,
    query.minPrice !== undefined ? gte(productsTable.price, query.minPrice) : undefined,
    query.maxPrice !== undefined ? lte(productsTable.price, query.maxPrice) : undefined,
    query.featured !== undefined ? eq(productsTable.featured, query.featured) : undefined,
    query.offers === true ? isNotNull(productsTable.offerId) : undefined,
    query.offers === false ? isNull(productsTable.offerId) : undefined,
  ].filter((condition): condition is NonNullable<typeof condition> => condition !== undefined);

  const orderBy = {
    newest: desc(productsTable.createdAt),
    oldest: asc(productsTable.createdAt),
    "price-low": asc(productsTable.price),
    "price-high": desc(productsTable.price),
    "coins-low": asc(productsTable.coins),
    "coins-high": desc(productsTable.coins),
    "gp-low": asc(productsTable.gp),
    "gp-high": desc(productsTable.gp),
  } as const;

  const products = await db
    .select()
    .from(productsTable)
    .where(and(...conditions))
    .orderBy(query.sort ? orderBy[query.sort] : desc(productsTable.featured), desc(productsTable.createdAt));

  res.json(ListProductsResponse.parse(products));
});

router.get("/products/:id", async (req, res): Promise<void> => {
  const parsedParams = GetProductParams.safeParse(req.params);
  if (!parsedParams.success) {
    res.status(400).json({ error: parsedParams.error.message });
    return;
  }

  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, parsedParams.data.id));

  if (!product || product.status === "Hidden") {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.json(GetProductResponse.parse(product));
});

router.get("/categories", async (_req, res): Promise<void> => {
  const categories = await db
    .select()
    .from(categoriesTable)
    .orderBy(asc(categoriesTable.name));
  res.json(ListCategoriesResponse.parse(categories));
});

router.get("/offers", async (req, res): Promise<void> => {
  const parsed = ListOffersQueryParams.safeParse(
    normalizeCatalogQuery(req.query as Record<string, unknown>),
  );
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const conditions = [
    parsed.data.active !== undefined
      ? eq(offersTable.active, parsed.data.active)
      : undefined,
    parsed.data.featured !== undefined
      ? eq(offersTable.featured, parsed.data.featured)
      : undefined,
  ].filter((condition): condition is NonNullable<typeof condition> => condition !== undefined);

  const offers = await db
    .select()
    .from(offersTable)
    .where(and(...conditions))
    .orderBy(desc(offersTable.featured), desc(offersTable.startDate));

  res.json(ListOffersResponse.parse(offers));
});

export default router;