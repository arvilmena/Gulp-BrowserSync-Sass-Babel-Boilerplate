<?php

require 'vendor/autoload.php';

use Dompdf\Dompdf;
use Dompdf\Options;

$options = new Options();
$options->setChroot(__DIR__);

// instantiate and use the dompdf class
$dompdf = new Dompdf($options);
$dompdf->load_html_file('index.html');

// Render the HTML as PDF
$dompdf->render();

// Output the generated PDF to Browser
$dompdf->stream(time().".pdf", array("Attachment" => false));

exit(0);
