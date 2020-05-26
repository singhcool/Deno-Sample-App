import {  MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

export class DatabaseConnection {
  public client: MongoClient;
  constructor(public dbName: string, public url: string) {
    this.dbName = dbName;
    this.url = url;
    this.client = {} as MongoClient;
  }
  public connect() {
    const client = new MongoClient();
    client.connectWithUri(this.url);
    this.client = client;
  }
  public getDatabase() {
    return this.client.database(this.dbName);
  }
}