export default function LoadingAnimation() {
    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-md">

            <div className="flex flex-col items-center">

                <div className="relative h-20 w-20">

                    {/* Outer dark ring */}
                    <div className="absolute inset-0 rounded-full border-[6px] border-gray-700"></div>

                    {/* Animated blue ring */}
                    <div className="absolute inset-0 animate-spin rounded-full border-[6px] border-transparent border-t-cyan-400 border-r-blue-500"></div>

                </div>

                <p className="mt-5 text-lg font-bold text-blue-400">
                    Loading...
                </p>

            </div>

        </div>
    );
}