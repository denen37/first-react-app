import { createServer } from "miragejs"

export default function () {
    createServer({
        routes() {
            this.namespace = ""

            this.get("/movies", () => {
                return {
                    movies: [
                        { id: 1, name: "Inception", year: 2010 },
                        { id: 2, name: "Interstellar", year: 2014 },
                        { id: 3, name: "Dunkirk", year: 2017 },
                    ],
                }
            })
        },
    })
}