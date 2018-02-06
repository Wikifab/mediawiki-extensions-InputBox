/**
 * Disable InputBox submit button when the corresponding text input field is empty.
 *
 * @author Tony Thomas
 * @license http://opensource.org/licenses/MIT MIT License
 */
( function ( $, mw ) {
	'use strict';
	mw.hook( 'wikipage.content' ).add( function( $content ) {
		var $input = $content.find( '.createboxInput:not([type=hidden])' ),
			onChange = function() {
			var $textbox = $( this ),
				$submit = $textbox.data( 'form-submit' );

			if ( !$submit ) {
				$submit = $textbox.nextAll( 'input.createboxButton' ).first();
				$textbox.data( 'form-submit', $submit );
			}

			$submit.prop( 'disabled', $textbox.val().length < 1 );
		}, i;

		for ( i = 0; i < $input.length; i++ ) {
			onChange.call( $input.get( i ) );
		}

		$input.on( 'keyup input change', $.debounce( 50, onChange ) );


		//manage prefix when veaction=edit
		$('form.createbox').has('input[name=veaction]').has('input[name=prefix]').submit(function () {
			// for veaction, the 'prefix' params is not taken into acccount,
			// so we add it to field before submit
			var prefix = $(this).find('input[name=prefix]').val();
			var title = $(this).find('input[name=title]').val();
			if ( ! title.startsWith(prefix) ) {
				$(this).find('input[name=title]').val(prefix + title);
			}
		});

	} );
}( jQuery, mediaWiki ) );
