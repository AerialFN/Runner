import asyncio
import uvloop

from . import main_loop

if __name__ == "__main__":
    uvloop.install()
    loop = asyncio.new_event_loop()
    loop.create_task(main_loop())
    asyncio.set_event_loop(loop)
    loop.run_forever()
