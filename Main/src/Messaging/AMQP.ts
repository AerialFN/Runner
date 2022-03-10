// AMQP Messaging
// Copyright (C) 2022  andre4ik3
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import AMQP from "amqplib";
import { getEnv, log } from "../Utils";
import { EventEmitter } from "events";

const AMQP_URL = getEnv("AMQP_URL");

declare interface AMQPManager {
  on(event: "hello", listener: (name: string) => void): this;
  on(event: string, listener: Function): this;
}

class AMQPManager extends EventEmitter {
  private connection?: AMQP.Connection;
  private channel?: AMQP.Channel;

  async connect() {
    this.connection = await AMQP.connect(AMQP_URL);
    this.channel = await this.connection.createChannel();
    this.channel.assertQueue("jobs", { durable: true });
    log.info("Connected to AMQP server and established queue.");
    this.channel?.consume("jobs", (data) => this.emit("msg", data));
  }
}

export default new AMQPManager();
