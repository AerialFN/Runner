// Main Entry Point
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

import zero from "zeromq";
import amqp from "amqplib";

const socket = zero.socket("push");

socket.bind("tcp://0.0.0.0:3000", (error) => {
  if (error) {
    console.log(`Error whilst binding to socket: ${error}`);
    process.exit(1);
  } else {
    console.log("ZeroMQ socket listening on port 3000");
  }
});

socket.on("message", m => console.log);
setTimeout(() => socket.send(`{ "hello": "world" }`), 10000);
