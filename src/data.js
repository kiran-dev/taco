export const setupResponse = {
  boards: [
    {
      id: "BOARD-1",
      title: "ToDo",
      meta: {
        count: 25,
        itemsOrder: ["ITEM-1", "ITEM-2", "ITEM-3"]
      },
    },
    {
      id: "BOARD-2",
      title: "In Progress",
      meta: {
        count: 0,
        itemsOrder: []
      }
    },
    {
      id: "BOARD-3",
      title: "Done",
      meta: {
        count: 25,
        itemsOrder: ["ITEM-7", "ITEM-8", "ITEM-9"]
      },
    },
    {
      id: "BOARD-4",
      title: "Resources",
      meta: {
        count: 0,
        itemsOrder: []
      }
    }
  ],
  items: [
    {
      id: "ITEM-1",
      title: "Build a better burrito: 7 layers  to success",
      boardID: "1",
      attachments: [{ type: "SubTasks", totalCount: 7, completedCount: 5 }],
      owner: {
        name: "",
        icon: ""
      }
    },
    {
      id: "ITEM-2",
      title: "Nacho Ordinary Birthday - Event Space Rentals",
      boardID: "1",
      attachments: [{ type: "DeadLine", date: "Dec 12" }],
      owner: {
        name: "",
        icon: ""
      }
    },
    {
      id: "ITEM-3",
      title: "Build a better burrito",
      boardID: "1",
      image: "https://www.andreasreiterer.at/wp-content/uploads/2017/11/react-logo-825x510.jpg",
      attachments: [{ type: "DeadLine", date: "Dec 12" }],
      owner: {
        name: "",
        icon: ""
      }
    },
    {
      id: "ITEM-7",
      title: "Build a better burrito: 7 layers  to success",
      boardID: "3",
      attachments: [{ type: "Files", count: 3 }],
      owner: {
        name: "",
        icon: ""
      }
    },
    {
      id: "ITEM-8",
      title: "Nacho Ordinary Birthday - Event Space Rentals",
      boardID: "3",
      attachments: [{ type: "DeadLine", date: "Dec 12" }],
      owner: {
        name: "",
        icon: ""
      }
    },
    {
      id: "ITEM-9",
      title: "Build a better burrito",
      boardID: "3",
      image: "",
      attachments: [{ type: "Files", count: 4 }],
      owner: {
        name: "",
        icon: ""
      }
    },
  ]
}