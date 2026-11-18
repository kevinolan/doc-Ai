import json
from pathlib import Path


DATASET = Path(__file__).parent.parent / "data" / "demo-appointments.json"
REQUIRED_FIELDS = {"id", "date", "month", "title", "detail", "time", "color"}
VALID_COLORS = {"blue", "purple"}


def main() -> None:
    with DATASET.open(encoding="utf-8") as file:
        records = json.load(file)

    if not isinstance(records, list) or not records:
        raise ValueError("The appointment dataset must be a non-empty JSON array.")

    ids = set()
    for record in records:
        if not isinstance(record, dict):
            raise ValueError("Every appointment record must be an object.")
        missing = REQUIRED_FIELDS - record.keys()
        if missing:
            raise ValueError(f"Missing fields: {', '.join(sorted(missing))}")
        if record["id"] in ids:
            raise ValueError(f"Duplicate appointment id: {record['id']}")
        if record["color"] not in VALID_COLORS:
            raise ValueError(f"Unsupported appointment color: {record['color']}")
        ids.add(record["id"])

    print(f"Validated {len(records)} appointment records from {DATASET}")


if __name__ == "__main__":
    main()
