# Android Workflow Render API

Creates a new Remotion video at request time. All `/v1/*` endpoints require:

```http
Authorization: Bearer YOUR_API_KEY
```

## Create a render

```http
POST /v1/renders
Content-Type: application/json
```

```json
{
  "fps": 60,
  "actions": [
    {"type": "home", "duration": 1},
    {"type": "openDrawer", "duration": 1},
    {"type": "scrollDrawer", "duration": 2},
    {"type": "openApp", "app": "calculator", "duration": 2},
    {"type": "tap", "value": "12×8=", "duration": 1},
    {"type": "goHome", "duration": 1},
    {"type": "openApp", "app": "camera", "duration": 2}
  ]
}
```

Response (`202`):

```json
{"job":{"id":"uuid","status":"queued","progress":0}}
```

## Check progress

```http
GET /v1/renders/JOB_ID
```

Statuses: `queued`, `rendering`, `completed`, `failed`. Progress ranges from `0` to `1`.

## Download

```http
GET /v1/renders/JOB_ID/video
```

Returns `video/webm` after completion.

## Supported actions

- `home`
- `openDrawer`
- `scrollDrawer`
- `openApp`
- `tap`
- `wait`
- `goHome`

Supported apps: `calculator`, `camera`, `phone`, `settings`, `files`, `weather`, `clock`.

Rules: 1–100 actions, 0.25–60 seconds per action, 300 seconds maximum, FPS 30 or 60. Rendering is queued one job at a time. Completed files expire after 24 hours by default.

## Health

```http
GET /health
```

No authentication required.

## Website integration

The Vercel app proxies through `/api/renders` routes, keeping `RENDERER_API_KEY` server-side. External clients call the renderer URL directly with a Bearer key.

## Environment variables

Renderer:

- `RENDER_API_KEY`
- `ALLOWED_ORIGIN`
- `PORT`
- `RENDER_OUTPUT_DIR` (optional)
- `RENDER_TTL_MS` (optional)

Vercel:

- `RENDERER_API_URL`
- `RENDERER_API_KEY`

## Important runtime note

Jobs and metadata are kept in the renderer process memory, while videos are kept on its local disk. A service restart clears job metadata and ephemeral output. For durable multi-instance production, replace this with Redis/Postgres plus object storage.
