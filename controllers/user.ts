
const books = new Map<string, any>();
books.set("1", {
  id: "1",
  title: "The Hound of the Baskervilles",
  author: "Conan Doyle, Author Test",
});

const api = (ctx: any) =>{
    ctx.response.body = Deno.env.get('GREETING');
}

const getBookByID = (ctx: any) =>{
    if (ctx.params && ctx.params.id && books.has(ctx.params.id)) {
        ctx.response.body = books.get(ctx.params.id);
      }
}

export {
    api,
    getBookByID
}