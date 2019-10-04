import React from 'react';
import ScrollableAnchor from 'react-scrollable-anchor';
import '../css/home.css'
export default (props) => {
    const { id } = props;
    return <ScrollableAnchor id={'home-scroll'}>
        <section  id={id}>
    	<div className="container">
    		<div className="row">
    			<div className="col-md-12">
    				<h1>Hello Frands</h1>
					<h3><span>Chai Pee Lo</span></h3>
					<h2>GARAM HAI!</h2>
    			</div>
    		</div>
    	</div>
    </section>
    </ScrollableAnchor >
}