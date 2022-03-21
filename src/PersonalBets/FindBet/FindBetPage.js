import React from 'react'
import MenuList from '../../MenuList'
import undraw_file_searching from '../../images/undraw_file_searching.svg'
import {motion} from 'framer-motion'
import {Link } from 'react-router-dom'
import './FindBetPage.css'
function FindBetPage() {
  return (
    <div className="menuScreen less">
    <div className="menuScreen__container less2">
      <div className="menuScreen__left">
        <MenuList />
      </div>
      <div className="menuScreen__right">
        <h1 style={{ color: "#fff" }}>🔎Find your bet</h1>
        <div className="menuScreen__category">
        <motion.div initial={{x:1000}} animate={{x:0}} transition={{duration:0.8, type:'spring', stiffness:75}} className="train_card3 StyleCards">
                <div className="train_rigth4" style={{ marginTop:'4%' }}>
                  <h1 >Find a a social bet for you</h1>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Distinctio, provident debitis, fuga amet quam id porro at
                    dolorem animi totam ab temporibus voluptatum odit quaerat
                    eaque. Perferendis eveniet a ab? Architecto, vel nam autem
                    laudantium enim ad assumenda reprehenderit ipsa veritatis
                    consequuntur laborum iusto, aliquam itaque at? Facere
                    laborum voluptates necessitatibus blanditiis a saepe vitae
                    qui sequi! Placeat, dolores commodi!
                  </p>
                  <Link to='/GlobalSerch'>
                    <motion.button  style={{marginBottom:'2%', marginTop:'-2%'}} whileHover={{ color:'purple', backgroundColor:'white', boxShadow: '2px 6px #888888'}}>
                    serch your bet
                    </motion.button></Link>
                </div>
                <div className="left4" style={{marginLeft:'5%'}}>
                  <img className="find_img" src={undraw_file_searching} alt="" />
                </div>
              </motion.div>

                {/* Aca es la parte de abajo */}

              <div style={{textAlign:'center', marginTop:'2%'}} className="upContainer">
                <motion.div
                  animate={{ x: 0 }}
                  initial={{ x: 1000 }}
                  transition={{ type: "spring", duration: 1.5 }}
                  className="card1"
                  
                >
                  <div className="rigth" style={{marginLeft:'12%'}}>
                    <h1 style={{marginBottom:'4%'}}>🤠Public Serch</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Accusantium sint accusamus recusandae optio voluptate
                      alias blanditiis
                    </p>
                    <Link to='/GlobalSerch'>
                    <motion.button  style={{marginBottom:'4%'}} whileHover={{ color:'purple', backgroundColor:'white', boxShadow: '2px 6px #888888'}}>
                    subscription👈
                    </motion.button></Link>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ x: 0 }}
                  initial={{ x: 1000 }}
                  transition={{ type: "spring", duration: 1.2, delay: 0.5 }}
                  className="card1"
                >
                  <div className="rigth2" style={{marginLeft:'14%'}}>
                    <h1 style={{marginBottom:'4%'}}>💁Private Serch</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit
                      Accusantium sint accusamus recusandae optio voluptate
                      alias blanditiis
                    </p>
                    <Link to='/FindPrivateBet'>
                    <motion.button  whileHover={{ color:'purple', backgroundColor:'white', boxShadow: '2px 6px #888888'}}>
                    serch👈
                    </motion.button></Link>
                  </div>
                </motion.div>
              </div>
          </div>
      </div>
    </div>
  </div>
  )
}

export default FindBetPage