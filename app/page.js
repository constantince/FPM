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
    // console.log(userInfo)
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
                    href="/signin"
                    className="middle none center mr-4 rounded-lg bg-blue-500 py-2 px-6 font-sans text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    Login
                </a>
            </header>
            <main className="flex min-h-screen flex-col items-center justify-between p-24 py-5">
                <div className="flex items-center min-h-screen bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto">
                        <div className="max-w-md mx-auto my-10 bg-white dark:bg-gray-800 p-5 rounded-md shadow-sm">
                            <div className="text-center">
                                <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
                                    Create Your Custom Voice From Youtube
                                </h1>
                            </div>
                            <div className="m-7">
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
                                            className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                                        >
                                            Name of the Example Voice:
                                        </label>
                                        <input
                                            type="text"
                                            name="voice"
                                            id="voice"
                                            placeholder="Example"
                                            required
                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            htmlFor="link"
                                            className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                                        >
                                            Example Youtube Link
                                        </label>
                                        <input
                                            type="link"
                                            name="link"
                                            id="link"
                                            pattern="^https?:\/\/(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})$"
                                            placeholder="https://youtube.com?watch=xxxxxxx"
                                            required
                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                                        >
                                            Name of the New Voice:
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Example one."
                                            required
                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            htmlFor="message"
                                            className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                                        >
                                            New Voice Content
                                        </label>
                                        <textarea
                                            rows={5}
                                            name="message"
                                            id="message"
                                            placeholder="Your Words"
                                            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                            required
                                            defaultValue={''}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <button
                                            type="submit"
                                            className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                                        >
                                            Create Voice
                                        </button>
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

                <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"></div>
            </main>
        </>
    )
}
