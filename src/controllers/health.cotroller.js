exports.getHealthStatus = async (req, res, next) => {
    res.status(200).json({ result: 'UP' });
    return;
}