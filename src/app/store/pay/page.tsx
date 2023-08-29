
export default function Pay() {


    return <div className="bg-gray-600 h-screen">
        <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 9 }, (_, i) => i + 1).map(x => <div className="text-white w-1/2 p-2 rounded-full border border-white text-center" key={`char-${x}`}>{x}</div>)}
        </div>

    </div>
}