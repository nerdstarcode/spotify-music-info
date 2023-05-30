import { z } from "zod";

export const TopTracksReponseSchema = z.object({
  items: z.array(
    z.object({
      album: z.object({
        artists: z.array(
          z.object({
            external_urls: z.object({
              spotify: z.string().url(),
            }),
            name: z.string()
          })
        ),
        external_urls: z.object({
          spotify: z.string().url(),
        }),
        images: z.array(z.object({
          height: z.number(),
          url: z.string().url(),
          width: z.number()
        })),
        name: z.string(),
      }),
      artists: z.array(
        z.object({
          external_urls: z.object({
            spotify: z.string().url(),
          }),
          href: z.string().url(),
          name: z.string(),
          type: z.string(),
        })
      ),
      href: z.string().url(),
      external_urls: z.object({
        spotify: z.string().url(),
      }),
      uri: z.string(),
      name: z.string(),
      popularity: z.number(),
      preview_url: (z.string().url()).or(z.null())
    })
  ),
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
  href: z.string().url(),
  previous: (z.string().url()).or(z.null()),
  next: (z.string().url()).or(z.null())
}).strict()

export type TopTracksReponseDTO = z.infer<typeof TopTracksReponseSchema>

export const TrackSchema = z.object({
  album: z.object({
    artists: z.array(
      z.object({
        external_urls: z.object({
          spotify: z.string().url(),
        }),
        name: z.string()
      })
    ),
    external_urls: z.object({
      spotify: z.string().url(),
    }),
    images: z.array(z.object({
      height: z.number(),
      url: z.string().url(),
      width: z.number()
    })),
    name: z.string(),
  }),
  artists: z.array(
    z.object({
      external_urls: z.object({
        spotify: z.string().url(),
      }),
      href: z.string().url(),
      name: z.string(),
      type: z.string(),
    })
  ),
  href: z.string().url(),
  name: z.string(),
  popularity: z.number(),
  preview_url: (z.string().url()).or(z.null()),
  external_urls: z.object({
    spotify: z.string().url(),
  }),
  uri: z.string()
})
export type TrackDTO = z.infer<typeof TrackSchema>