import { neon } from "@neondatabase/serverless";

function db() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured");
  return neon(process.env.DATABASE_URL);
}
async function ready() {
  await db()`CREATE TABLE IF NOT EXISTS responses (
    id SERIAL PRIMARY KEY, staff_name TEXT NOT NULL DEFAULT '익명', gender TEXT NOT NULL,
    age_group TEXT NOT NULL, menus JSONB NOT NULL, warm TEXT NOT NULL,
    satisfaction INTEGER NOT NULL, seasoning TEXT NOT NULL, improvements JSONB NOT NULL,
    comment TEXT NOT NULL DEFAULT '', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
}
export async function GET(request: Request) {
  if (!process.env.ADMIN_PIN || new URL(request.url).searchParams.get("pin") !== process.env.ADMIN_PIN)
    return Response.json({ error: "관리자 암호가 맞지 않습니다." }, { status: 401 });
  await ready();
  const rows = await db()`SELECT id, staff_name AS "staffName", gender, age_group AS "ageGroup", menus, warm, satisfaction, seasoning, improvements, comment, created_at AS "createdAt" FROM responses ORDER BY created_at DESC`;
  return Response.json({ responses: rows });
}
export async function POST(request: Request) {
  try {
    const p = await request.json() as Record<string, unknown>;
    if (!p.gender || !p.ageGroup || !Array.isArray(p.menus) || !p.menus.length || !p.warm || !p.satisfaction || !p.seasoning || !Array.isArray(p.improvements) || !p.improvements.length)
      return Response.json({ error: "필수 항목을 모두 입력해 주세요." }, { status: 400 });
    await ready();
    const rows = await db()`INSERT INTO responses (gender, age_group, menus, warm, satisfaction, seasoning, improvements, comment)
      VALUES (${String(p.gender)}, ${String(p.ageGroup)}, ${JSON.stringify(p.menus)}::jsonb, ${String(p.warm)}, ${Number(p.satisfaction)}, ${String(p.seasoning)}, ${JSON.stringify(p.improvements)}::jsonb, ${String(p.comment || "")})
      RETURNING id`;
    return Response.json({ ok: true, id: rows[0].id }, { status: 201 });
  } catch {
    return Response.json({ error: "응답 저장 중 오류가 발생했습니다." }, { status: 500 });
  }
}
