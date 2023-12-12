import { MessageBuilder } from "../shared/message"
import { ENDPOINT, KEY } from '../utils/config/constants'

const messageBuilder = new MessageBuilder();

async function fetchData(ctx, param) {
  try {    

    const res = await fetch({
      url: ENDPOINT,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({        
        data: param.data,
        type: param.type,
        key: KEY
      })
    })

    const resBody = typeof res.body === 'string' ? JSON.parse(res.body) : res.body

    ctx.response({
      data: { result: resBody },
    })

  } catch (error) {        
    ctx.response({
      data: { result: "ERROR-"+error.message },
    });
  }
};

AppSideService({
  onInit() {
    messageBuilder.listen(() => { });

    messageBuilder.on("request", (ctx) => {
      const jsonRpc = messageBuilder.buf2Json(ctx.request.payload);      
      return fetchData(ctx, jsonRpc);
    });
  },

  onRun() { },

  onDestroy() { },
});
