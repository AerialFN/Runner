import asyncio
import uvloop

from . import main_loop

if __name__ == "__main__":
    uvloop.install()
    asyncio.set_event_loop(loop)
    asyncio.run(main_loop())
