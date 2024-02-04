import getUserAuth from '../utils/server_user_auth'
// const storage = getStorage()
// const storageRef = ref(storage, "audios/first_voice.mp3");
// console.log(storageRef);
// getDownloadURL(storageRef).then((downloadURL) => {
//   console.log("voice:--------", downloadURL);
// });

// console.log("app/page.js line 26:", decodedToken);
export default async function Home() {
    const user = await getUserAuth()
    const { id } = user
    console.log('this is user::::', user)
    // const [file, setFile] = useState(null)
    // const [user, setUser] = useState(userInfo)
    // const [warn, setWarn] = useState(null)
    // const [name, setName] = useState(null)
    // const [progress, setProgress] = useState(0)
    // const router = useRouter()

    // onAuthStateChanged(getAuth(), async (user) => {
    //   if (user) {
    //     await user.getIdToken(true);
    //     user.getIdTokenResult().then((res) => {
    //       alert(JSON.stringify(res.claims));
    //     });
    //   }
    // });

    // return (
    //   <>
    //     <Link href={{ pathname: "/transcription/1" }}>must login firt</Link>
    //     <a href="/transcription/">without auth</a>
    //   </>
    // );
    // console.log("what is going on preview...");

    return (
        <>
            <header className="flex justify-end p-5">
                <a
                    href={!id ? '/signin' : '/profile'}
                    className="middle none center mr-4 rounded-lg bg-blue-500 py-2 px-6 font-sans text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    {!id ? 'Login' : 'My Voices'}
                </a>
            </header>
            <main className="flex min-h-screen flex-col items-center justify-between p-5 py-5 overflow-hidden">
                <div className="flex w-full items-start min-h-screen justify-center bg-gray-50 dark:bg-gray-900 bg-no-repeat bg-left bg-[length:50%] bg-[url('https://tailus.io/sources/blocks/tech-startup/preview/images/globalization-cuate.svg')]">
                    <div className="text-left flex mr-10 jusity-start flex-col mt-20 max-w-xs">
                        <h1 className="my-3 text-5xl font-semibold text-white dark:text-gray-200">
                            Create Your Custom Voice From Youtube
                        </h1>
                    </div>
                    <div>
                        <div className="container mx-auto">
                            <div className="max-w-md mx-auto my-10 bg-white dark:bg-gray-800 p-5 rounded-md shadow-sm">
                                <div className="">
                                    <form
                                        action="/api/create_project"
                                        method="POST"
                                        id="clone-form"
                                    >
                                        <input
                                            type="text"
                                            value={id}
                                            name="uid"
                                            className="hidden"
                                            readOnly={true}
                                        />

                                        <div className="mb-6">
                                            <label
                                                htmlFor="voice"
                                                className="mb-3 text-gray-900 font-mono font-bold text-lg"
                                            >
                                                Name of the Example Voice:
                                            </label>
                                            <input
                                                type="text"
                                                name="voice"
                                                id="voice"
                                                maxLength="20"
                                                placeholder="Voice example one"
                                                required
                                                className="mt-3 w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium "
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label
                                                htmlFor="link"
                                                className="mb-5 text-gray-900 font-mono font-bold text-lg"
                                            >
                                                Youtube Link
                                                <span className="text-xs">
                                                    (only support youtebe video
                                                    for now)
                                                </span>
                                            </label>
                                            <input
                                                type="link"
                                                name="link"
                                                id="link"
                                                pattern="(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|playlist\?|watch\?v=|watch\?.+(?:&|&#38;);v=))([a-zA-Z0-9\-_]{11})?(?:(?:\?|&|&#38;)index=((?:\d){1,3}))?(?:(?:\?|&|&#38;)?list=([a-zA-Z\-_0-9]{34}))?(?:\S+)?"
                                                placeholder="https://youtube.com/watch?v=xxxxxxx"
                                                required
                                                className="mt-3 w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium "
                                            />
                                        </div>
                                        <div className="bg-slate-100 h-1 mb-6"></div>
                                        <div className="mb-6">
                                            <label
                                                htmlFor="name"
                                                className="mb-5 text-gray-900 font-mono font-bold text-lg"
                                            >
                                                Title of the New Voice:
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                maxLength="20"
                                                placeholder="Beatifully morning"
                                                required
                                                className="mt-3 w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium "
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label
                                                htmlFor="message"
                                                className="mb-5 text-gray-900 font-mono font-bold text-lg"
                                            >
                                                Your Script
                                            </label>
                                            <textarea
                                                rows={5}
                                                maxLength="100"
                                                name="message"
                                                id="message"
                                                placeholder="Your Words:Max length 100 words"
                                                className="mt-3 w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium "
                                                required
                                                defaultValue={''}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            {id ? (
                                                <button
                                                    type="submit"
                                                    className="w-full px-3 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                                                >
                                                    Create Voice
                                                </button>
                                            ) : (
                                                <a
                                                    href="/signin"
                                                    className="block text-center w-full px-3 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                                                >
                                                    Create Voice
                                                </a>
                                            )}
                                        </div>
                                        <p
                                            className="text-base text-center text-gray-400"
                                            id="result"
                                        ></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>
            </main>
        </>
    )
}
