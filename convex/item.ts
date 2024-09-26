import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
export const getItems = query ({
    args :{

    },
    async handler(ctx,args) {
        const res = await ctx.db.query("item").collect();
        return res;
    }
})

export const createItem = mutation({
    args: {
        date: v.string(),
        day: v.string(),
        faculty: v.string(),
        subject: v.string(),
        time: v.string(),
        name: v.string(),
        sap: v.string(),
        reason: v.string(),
        division: v.string(),
    },
     async handler(ctx,args) {
        const res = await ctx.db.insert("item", {
            date: args.date,
            day: args.day,
            faculty: args.faculty,
            subject: args.subject,
            time: args.time,
            name: args.name,
            sap: args.sap,
            reason: args.reason,
            division: args.division,

        })

        return res
        
     }
})