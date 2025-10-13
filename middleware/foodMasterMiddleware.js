
export const validateFoodMaster = async (req, res, next) => {
    const { name, category, serving_size, serving_unit, calories,protein_g,carbs_g, alternate_units } = req.body

    if (!name) {
        return res.status(400).json({ success: false, message: "please enter name" })
    }
    if (!category) {
        return res.status(400).json({ success: false, message: "please enter category" })
    }
    if (!serving_size) {
        return res.status(400).json({ success: false, message: "please enter serving_size" })
    }

    if (!serving_unit) {
        return res.status(400).json({ success: false, message: "please enter serving_unit" })
    }

    if (!calories) {
        return res.status(400).json({ success: false, message: "please enter calories" })
    }

    if (!protein_g) {
        return res.status(400).json({ success: false, message: "please enter protein_g" })
    }
     if (!carbs_g) {
        return res.status(400).json({ success: false, message: "please enter carbs_g" })
    }    

    alternate_units?.map(unit => {
        if(unit.name =="")
        {
            return res.status(400).json({ success: false, message: "please enter name of Alternative Unit" })
        }
    })

    next()

}