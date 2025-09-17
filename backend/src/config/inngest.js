
import { Inngest } from "inngest";
import { connectdb } from "./db.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "slack-clone" });

export const syncUser=inngest.createFunction(
    {id:"sync-user"},
    {event:"clerk/user.created"},
    async ({event})=>{
        await connectdb()

        const {id,email_address,frist_name,last_name,image_url}=event.data
        const newUser={
            clerkId:id,
            name:`${frist_name||""} ${last_name||""}`,
            email_address:email_address[0]?.email_address,
            image_url:image_url,
        }
        await User.create(newUser)
        // todo two more things
    }
)
const deleteUserfromdb=inngest.createFunction(
    {id:"sync-user-from-db"},
    {event:"clerk/user.deleted"},
    async ({event})=>{
        const {id}=event.data
        await User.deleteOne({clerkId:id})
        //todo two more things
    }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser,deleteUserfromdb];