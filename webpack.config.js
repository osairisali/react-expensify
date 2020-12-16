const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (env) => {
  const isProduction = env === "production";
  // pakai plugin ExtractTextPlugin untuk memisahkan bundle.js dgn css agar ukurannya nggak terlalu besar
  // pass style.css ke class constructor sbg nama file css yg akan dibuat
  const CSSExtract = new ExtractTextPlugin("styles.css");

  console.log("env: ", env);
  return {
    entry: "./src/app.js",
    output: {
      path: path.join(__dirname, "public", "dist"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          loader: "babel-loader",
          test: /\.js$/,
          exclude: /node_modules/,
        },
        {
          test: /\.s?css$/,
          // use: ["style-loader", "css-loader", "sass-loader"],
          use: CSSExtract.extract({
            // style-loader nggak usah masuk krn sdh ditangani otomatis
            use: [
              { loader: "css-loader", options: { sourceMap: true } },
              { loader: "sass-loader", options: { sourceMap: true } },
            ],
          }),
        },
      ],
    },
    plugins: [CSSExtract],
    // devtool: isProduction ? "source-map" : "cheap-module-eval-source-map",
    // u/ devtool, cheap-moduel diganti inline-source-map krn less buggy, walaupun inline-source-map sdkt lbh lambat
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      // tell webpack untuk re-render index.html jika ketemu 404 error page
      // ini berguna agar react router berjalan, dan tdk terjadi req rendering page di server side
      historyApiFallback: true,
      publicPath: "/dist/"
    },
  };
};
