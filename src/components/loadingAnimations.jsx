export default function LoadingAnimation() {
    return(
        <div className="w-screen h-screen bg-black/50 flex justify-center items-center fixed top-0 left-0">

            <div className="w-[100px] h-[100px] border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
    )
}