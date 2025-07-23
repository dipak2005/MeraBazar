const UserModel = require("../../models/UserModel");

const getUserById = async(req,res) => {


    try {

        const userId = req.params.id;

        const user = await UserModel.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success:false,
                message:"User Not Found!",
            })
        }


        res.status(200).json({
            success:true,
            data:user,
        })

    }catch(e) {
        console.log(e);
        res.status(500).json({
            success:false,
            message:"Internal Server Error!",
        })

    }
}

module.exports = {getUserById};