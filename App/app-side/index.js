import { MessageBuilder } from "../shared/message";

const messageBuilder = new MessageBuilder();

async function fetchData(ctx, param) {
  try {    
    
    // POST method request
    const res = await fetch({
      url: 'https://www.exampple.com/post.php?',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: param,
        key: "52f13ff0-8dd1-11ee-b9d1-0242ac120002"
      })
    })

    
    const resBody = typeof res.body === 'string' ? JSON.parse(res.body) : res.body

    ctx.response({
      data: { result: resBody },
    })

  } catch (error) {
    ctx.response({
      data: { result: "ERROR" },
    });
  }
};

AppSideService({
  onInit() {
    messageBuilder.listen(() => { });

    messageBuilder.on("request", (ctx) => {
      const jsonRpc = messageBuilder.buf2Json(ctx.request.payload);
      if (jsonRpc.method === "POST_DATA") {
        return fetchData(ctx, jsonRpc.data);
      }
    });
  },

  onRun() { },

  onDestroy() { },
});
