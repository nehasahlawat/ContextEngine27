// Copyright (c) 2015 The Regents of the University of California.
// All rights reserved.

// Permission is hereby granted, without written agreement and without
// license or royalty fees, to use, copy, modify, and distribute this
// software and its documentation for any purpose, provided that the above
// copyright notice and the following two paragraphs appear in all copies
// of this software.

// IN NO EVENT SHALL THE UNIVERSITY OF CALIFORNIA BE LIABLE TO ANY PARTY
// FOR DIRECT, INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES
// ARISING OUT OF THE USE OF THIS SOFTWARE AND ITS DOCUMENTATION, EVEN IF
// THE UNIVERSITY OF CALIFORNIA HAS BEEN ADVISED OF THE POSSIBILITY OF
// SUCH DAMAGE.

// THE UNIVERSITY OF CALIFORNIA SPECIFICALLY DISCLAIMS ANY WARRANTIES,
// INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE SOFTWARE
// PROVIDED HEREUNDER IS ON AN "AS IS" BASIS, AND THE UNIVERSITY OF
// CALIFORNIA HAS NO OBLIGATION TO PROVIDE MAINTENANCE, SUPPORT, UPDATES,
// ENHANCEMENTS, OR MODIFICATIONS.

/** An accessor for playing a sound clip.
 * 
 *  @accessor audio/ClipPlayer
 *  @author Elizabeth Osyk (beth@berkeley.edu)
 *  @input start A trigger input to start playback.  
 *   The value is ignored and can be anything.
 *  @input stop A trigger to stop playback.  
 *   The value is ignored and can be anything.
 *  @parameter clipURL The URL to retrieve the sound clip from. 
 *  @version $$Id: ClipPlayer.js 748 2016-04-29 21:51:14Z cxh $$ 
 */

var audio = require("audio");

exports.setup = function() {
    this.input('start');
    this.input('stop');
    this.output('output');
    this.parameter('clipURL');
};

exports.initialize = function() {
	var self = this;
	self.player = new audio.ClipPlayer();
	self.player.load(this.getParameter('clipURL'));
	
	this.addInputHandler('start', function () {
        self.player.play();
        self.send('output', true);
    });
	
	this.addInputHandler('stop', function() {
		self.player.stop();
		self.send('output', false);
	});
};

exports.wrapup = function() {
	if (this.player !== null) {
		this.player.stop();
	}
};
