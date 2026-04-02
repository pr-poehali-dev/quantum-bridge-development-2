import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Сохраняет email в список ожидания приложения «Помогу»"""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}

    body = json.loads(event.get("body") or "{}")
    email = (body.get("email") or "").strip().lower()

    if not email or "@" not in email:
        return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Некорректный email"})}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    cur.execute("SELECT id FROM waitlist WHERE email = %s", (email,))
    if cur.fetchone():
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True, "already": True})}

    cur.execute("INSERT INTO waitlist (email) VALUES (%s)", (email,))
    conn.commit()
    cur.close()
    conn.close()

    return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True})}