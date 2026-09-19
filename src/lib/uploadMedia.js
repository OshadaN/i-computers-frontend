import { createClient } from "@supabase/supabase-js";

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvaGx1eXFkaW9wcWJsYW9kaWNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzNjk1NjIsImV4cCI6MjEwMzk0NTU2Mn0.pSm5N0ZJW2hyepC-uDRSQFNLPvvWm9KkEYzVz2RWGsY";
const url = "https://cohluyqdiopqblaodice.supabase.co";

const supabase = createClient(url, key);

export default function uploadMedia(file) {

    return new Promise((resolve, reject) => {
            if (file === null) {
                reject("No file selected");

            } else {

                const timestamp = new Date().getTime()

                const fileName = timestamp + "_" + file.name;
              


                supabase.storage
                .from("images")
                .upload(fileName, file)
                .then(

                    () => {

                        const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                        
                        resolve(publicUrl);
                    
                    })
                .catch((err) => {
                    reject(err);
                });
            }
        });
}

