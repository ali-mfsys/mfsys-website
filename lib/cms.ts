import {db} from "./db";
import {auditLogs} from "./db/schema";

export {db};

export async function audit(
  userId: string,
  action: string,
  entity: string,
  entityId?: string
) {
  return db.insert(auditLogs).values({
    userId,
    action,
    entity,
    entityId
  }).returning();
}
