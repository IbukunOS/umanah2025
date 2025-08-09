import PropTypes from 'prop-types';

function Row({ translateClass, direction }) {

    const items = [
        { text: "Beloved Teacher", },
        { text: "Inspiring Mentor", },
        { text: "Guiding Light", },
        { text: "Caring Mother", },
        { text: "Wisdom Giver", },
        { text: "Role Model", },
        { text: "Heart of Gold", },
        { text: "Retirement Joy", },
        { text: "Legacy Maker", },
        { text: "Thank You!", },
        { text: "Lifelong Learner", },
        { text: "Classroom Hero", },
        { text: "Cherished Always", },
        { text: "Congratulations!", },
    ]

  return (
    <div 
        className={`${translateClass} ${direction} row w-full flex 
        items-center  
        gap-8 
        whitespace-nowrap mb-2`}
    >
        {items.map((item, index) => {
            return (
                <div 
                    key={index} 
                    className='elem flex items-center gap-8'
                >
                    <h1 
                        className='font-[SansitaBold] text-[6vh] sm:text-[8.4vh] 
                        leading-[6vh] sm:leading-[9vh]'
                    >
                        {item.text}
                    </h1>
                    <div className='imgdiv w-[5vh] h-[5vh]'>
                        <img 
                            className=''
                            src={item.image} 
                        />
                    </div>
                </div>
            )
        })}
    </div>
  )
}

Row.propTypes = {
    translateClass: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired
  };

export default Row
