export const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.stack);
    // return res.status(500).json({ status: false, error: err.stack });
    return res.status(500).json({
      status: false,
      error: "Something went wrong",
    });
  };
  