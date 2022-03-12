# Fortnite Container Entry Point
# Copyright (C) 2022  andre4ik3
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

#system imports
import asyncio
import json


#3rd party imports
import fortnitepy
from Client import AerialClient

context = zmq.Context()
socket = context.socket(zmq.PULL)

# Connect to socket
try:
  socket.connect("tcp://main:3000")
  print("Connected to ZeroMQ socket")
except:
  print("Unable To connect To ZeroMQ socket")

clients = {
    # example
    "bruh-moment-some-random-id": [ Client1, Client2, Client3 ]
}

async def receive():
  while True:
    msg_ = socket.recv()
    msg = json.loads(msg_)
    print(f"received:\n{msg}")
    if msg['action'] == 0:
      channel = msg['data']['channelId']
      client = AerialClient(
        auth=fortnitepy.DeviceAuth(
          device_id=msg['auths']['deviceId'],
          account_id=msg['auths']['clientId'],
          secret=msg['auths']['secret'],
        )
      )
      try:
        await client.login()
        if clients[channel] == None:
          clients[channel] = [] 
        clients[channel].append(client)
      except:
        pass 

asyncio.run(receive())
