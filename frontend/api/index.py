"""Vercel Python serverless entrypoint for the FF Token Tool API.

Vercel's Python runtime detects the ASGI ``app`` exported here and serves it.
All backend logic lives in the ``_core`` package (ignored by Vercel as a
function entrypoint because it is prefixed with ``_``).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from _core.main import app  # noqa: E402

__all__ = ["app"]
