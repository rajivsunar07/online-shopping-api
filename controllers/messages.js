exports.success_message = (res, message) => {
    res.status(200).json({
        success: true,
        message: message
    })
}

exports.success_result = (res, result) => {
    res.status(200).json({
        success: true,
        result: result
    })
}

exports.error_message = (res, err, message) => {
    res.status(500).json({
        error: err,
        message: message
    })
}
