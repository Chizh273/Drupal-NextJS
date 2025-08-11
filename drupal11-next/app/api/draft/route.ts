import { enableDraftMode } from "next-drupal/draft"
import type { NextRequest } from "next/server"

import { drupal } from "@/lib/drupal"

export async function GET(request: NextRequest): Promise<Response | never> {
  return await enableDraftMode(request, drupal)
}
