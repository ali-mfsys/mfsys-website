import {getDb} from "./db";
import {auditLogs} from "./db/schema";

export async function audit(
  userId: string,
  action: string,
  entity: string,
  entityId?: string
) {
  return getDb().insert(auditLogs).values({
    userId,
    action,
    entity,
    entityId
  }).returning();
}
