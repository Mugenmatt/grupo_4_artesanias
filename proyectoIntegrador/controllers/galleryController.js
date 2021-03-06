const db= require('../database/models/');
const User = db.User;
const Product = db.Product;

const galleryController = {
    index: function(req, res) {

      let artistas = User.findAll({
        where:{
          rol:1
        }
      });

      let obras = Product.findAll(
         {
           where:{
             status: 0
           },
           include: ["productimages", "user"]
          }
        );
        
      Promise.all([artistas,obras])
        .then(function([artistas,obras]){
          
          return res.render('gallery',{artistas,obras})
        })
        .catch(errors=>console.log(errors));
    },

    byArtist: function(req,res){
      let artistId = req.params.artistId;

      User.findByPk(artistId,{
        include: ['products']
      }).then(function(artista){
        return res.render('artist-gallery',{artista})
      })
      .catch(errors=>console.log(errors));

    },

    api: function(req,res){


      User.findAll({
        where:{
          rol:1
        }
      })
      .then((artistasEncontrados)=>{
        let artistas= artistasEncontrados;

        artistas.forEach(artista => {
          delete artista.dataValues.password
        });

        return res.json(artistas)
      })
    }
}

module.exports= galleryController;