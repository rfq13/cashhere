module.exports = async (req) => {
  const flashError = await req.consumeFlash("error");
  const flashSuccess = await req.consumeFlash("success");
  const flashWarning = await req.consumeFlash("warning");

  return {
    error: flashError,
    success: flashSuccess,
    warning: flashWarning,
  };
};
