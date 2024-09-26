import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    item: defineTable({
        date: v.string(),
        day: v.string(),
        faculty: v.string(),
        subject: v.string(),
        time: v.string(),
        name: v.string(),
        sap: v.string(),
        reason: v.string(),
        division: v.string(),
    })
})