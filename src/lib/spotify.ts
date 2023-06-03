import { TopTracksReponseDTO, TopTracksReponseSchema, TrackDTO } from "@/components/molecules/TopTracks/interaces.dto";
import { api } from "./api";
import queryString from "query-string";

export async function getTopTracks(user: any): Promise<TopTracksReponseDTO> {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.spotify.com/v1/me/top/tracks',
        headers: { 'Authorization': 'Bearer ' + user.auth }
    };
    const topTracksResponse = await api.request(config)
        .catch((error) => {
            console.error(error);
        });
    const response = TopTracksReponseSchema.parse(topTracksResponse?.data)
    return response
}
interface queue {
    user: any,
    track?: TrackDTO
    uri?: string
}

export const addToQueue = async ({ user, track, uri }: queue) => {

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://api.spotify.com/v1/me/player/queue?uri=${track?.uri||uri}`,
        headers: { 'Authorization': 'Bearer ' + user.auth }
    };

    await api.request(config)
        .catch((error) => {
            console.error(error);
        });
    return
}

export const recomendations = async ({ user, track }: queue) => {
    let artists = track?.artists.map(artist => artist.id).join(',')

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.spotify.com/v1/recommendations?${queryString.stringify({
            seed_artists: artists,
            seed_tracks: track?.id
        })}`,
        headers: { 'Authorization': 'Bearer ' + user.auth }
    };

    const response: any = await api.request(config)
        .catch((error) => {
            console.error(error);
        });
    console.log(response)
    response.data.tracks.map(async(track:TrackDTO) => {await addToQueue({user, uri:track.uri})})
    
    return
}