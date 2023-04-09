interface props {
    onClick: any,
    height: number,
    width: number,
}

function Avatar({onClick=null, width = 12, height = 12}: props) {
    return(
        <>
            <img className={`w-${width} h-${height} rounded-full object-cover object-center cursor-pointer`} src="./src/assets/images/post2.jpg" alt="" onClick={onClick} />
        </>
    )
}

export default Avatar