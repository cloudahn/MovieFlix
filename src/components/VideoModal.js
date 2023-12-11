import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import YouTube from 'react-youtube';
import { useSelector} from 'react-redux'


const VideoModal = (props) => {

  console.log("모달에서 받은 props는?? ",props)
  const {movieYoutubeKey} = useSelector((state)=>state.movie)
  console.log("movieYoutubeKey ??? ", movieYoutubeKey)
  console.log("length??? ", movieYoutubeKey.length)

  const opts = {
    height: '540',
    width: '770',
    playerVars: {
      autoplay: 1,
    },
  };

    return (
      <div>
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered 
        >
          <Modal.Body >
            <YouTube videoId={movieYoutubeKey.results[0].key} opts={opts}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
}

export default VideoModal
