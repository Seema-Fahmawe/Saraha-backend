
export const asyncHandler = (fun) => {
    return (req, res) => {
        fun(req, res).catch(error => {
            return res.status(500).json({ message: 'catch error', error: error.stack });
        })
    }
}