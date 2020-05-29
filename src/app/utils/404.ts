export const notFound = async (ctx : any) => {
    ctx.response.status = 404;
    ctx.response.body = {
      error: "Not Found",
    };
}