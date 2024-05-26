export const StoriesSchema = {
  fields: {
    id: {
      type: "uuid",
      default: { $db_function: "uuid()" },
    },
    title: {
      type: "text",
      default: "no title provided",
      rule: {
        required: true,
      },
    },
    description: {
        type: "varchar",
        default: "no description provided",
        
      },
      content: {
        type: "varchar",
        default: "no content provided",
      
      },
       owner: {
        type: "uuid",
        rule: {
          required: true,
        },
      },
     
      gallery: {
        type: "set",
        typedef: "<text>",
      
      },
      comments_total: {
        type: "int",
        default: 0,
      },
      reaction_total: {
        type: "int",
        default: 0,
      },
      up_vote_total: {
        type: "int",
        default: 0,
      },
      down_vote_total: {
        type: "int",
        default: 0,
      },
   
    created: {
      type: "timestamp",
      default: { $db_function: "toTimestamp(now())" },
    },
  },
  key: [["id"], "created","owner"],
  clustering_order: { created: "desc" },
 

  
  
  table_name: "stories",
  
  options: {
    timestamps: {
      createdAt: "created_at", // defaults to createdAt
      updatedAt: "updated_at", // defaults to updatedAt
    },
    versions: {
      key: "__v", // defaults to __v
    },
  },
};
