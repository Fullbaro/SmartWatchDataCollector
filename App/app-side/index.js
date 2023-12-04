import { MessageBuilder } from "../shared/message";

const messageBuilder = new MessageBuilder();

async function fetchData(ctx, param) {
  try {    

    const res = await fetch({
      url: 'https://example.com',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({        
        data: param,
        key: "52f13ff0-8dd1-11ee-b9d1-0242ac120003"
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
      return fetchData(ctx, jsonRpc.data);
    });
  },

  onRun() { },

  onDestroy() { },
});
