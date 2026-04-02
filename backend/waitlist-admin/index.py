import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Возвращает список email-заявок для дашборда «Помогу»"""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute("SELECT id, email, created_at FROM waitlist ORDER BY created_at DESC")
    rows = cur.fetchall()
    cur.close()
    conn.close()

    data = [
        {"id": r[0], "email": r[1], "created_at": r[2].isoformat()}
        for r in rows
    ]

    return {
        "statusCode": 200,
        "headers": cors,
        "body": json.dumps({"total": len(data), "items": data}),
    }
